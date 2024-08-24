import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../services/swapi.service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { NumToRomanPipe } from '../num-to-roman.pipe';

@Component({
  selector: 'app-characters-details',
  standalone: true,
  imports: [LoaderComponent, NumToRomanPipe],
  templateUrl: './characters-details.component.html',
  styleUrl: './characters-details.component.scss'
})
export class CharactersDetailsComponent implements OnInit {
  personDetails: any;
  isInvalidCharacter: boolean = false;

  constructor(
    private swapiService: SwapiService,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.getPersonDetails(data?.id);
    })
  }
  getPersonDetails(id: any) {
    this.loaderService.isLoading.next(true)
    this.swapiService.getPersonDetailsById(id).subscribe((res: any) => {
      this.personDetails = res;
      this.personDetails.created = moment(res?.created).format('DD/MM/YYYY');
      this.personDetails.edited = moment(res?.edited).format('DD/MM/YYYY');
      this.getPlanetName(this.personDetails?.homeworld)
      this.personDetails?.species.length == 0 ? this.personDetails['species_name'] = 'N/A' : this.getSpeciesNames(this.personDetails?.species)
      this.getMovieDetails(this.personDetails?.films)
      this.getVehicleDetails(this.personDetails?.vehicles)
      this.getStarShipDetails(this.personDetails?.starships)
      // console.log(res);
      this.loaderService.isLoading.next(false)
    }, error => {
      // console.log(error?.error?.detail);
      if (error?.error?.detail == 'Not found') {
        this.isInvalidCharacter = true;
        this.loaderService.isLoading.next(false)
      }

    })
  }
  getPlanetName(planetUrl: String) {
    // debugger
    this.loaderService.isLoading.next(true)
    this.swapiService.getPlanetDetailsById(planetUrl).subscribe((res: any) => {
      // console.log(res);
      this.personDetails['planet_name'] = res?.name;
      this.loaderService.isLoading.next(false)
    })
    // return ''
  }
  getSpeciesNames(planetUrl: String[]) {
    this.loaderService.isLoading.next(true)
    this.swapiService.getDetailsById(planetUrl).subscribe((res: any) => {
      // console.log(res);
      this.personDetails['species_name'] = res.flatMap((x: any) => x?.name).join(',');
      this.loaderService.isLoading.next(false);
    })
    // return ''
  }
  getMovieDetails(movieUrl: String[]) {
    this.loaderService.isLoading.next(true)
    this.swapiService.getDetailsById(movieUrl).subscribe((res: any) => {
      // console.log(res);
      this.personDetails['movie_details'] = res;
      this.loaderService.isLoading.next(false);
    })
    // return ''
  }
  getVehicleDetails(vehicleUrl: String[]) {
    this.loaderService.isLoading.next(true);
    this.swapiService.getDetailsById(vehicleUrl).subscribe((res: any) => {
      // console.log(res);
      this.personDetails['vehicle_details'] = res.flatMap((x: any) => x?.name);
      this.loaderService.isLoading.next(false)
    })
    // return ''
  }
  getStarShipDetails(vehicleUrl: String[]) {
    this.loaderService.isLoading.next(true);
    this.swapiService.getDetailsById(vehicleUrl).subscribe((res: any) => {
      // console.log(res);
      this.personDetails['starship_details'] = res.flatMap((x: any) => x?.name);
      this.loaderService.isLoading.next(false);
    })
    // return ''
  }

}

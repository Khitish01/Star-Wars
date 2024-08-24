import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../services/swapi.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [ButtonModule, TableModule, InputTextModule, FormsModule, PaginatorModule, MultiSelectModule, LoaderComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  peopleData: any[] = [];
  filteredData: any[] = [];
  movieData: any[] = [];
  planetData: any[] = [];
  speciesData: any[] = [];
  vehicleData: any[] = [];
  starshipData: any[] = [];
  search: string = '';
  birthDateArr: any[] = [];



  selectedPlanet: any[] = [];
  selectedMovie: any[] = [];
  selectedSpecies: any[] = [];
  selectedVehicle: any[] = [];
  selectedStarShip: any[] = [];
  selectedBirthDate: any[] = [];

  constructor(
    private swapiService: SwapiService,
    private router: Router,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getMovieList();
    this.getPlanetList();
    this.getSpeciesList();
    this.getVehicleList();
    this.getStarshipList();
    this.getPeopleList();
  }


  openDetails(url: String) {
    let id = url.split('/')
    this.router.navigate(['/characters', id[id.length - 2]])

  }
  getPeopleList() {
    this.loaderService.isLoading.next(true)
    this.swapiService.getAll('people').subscribe((data: any) => {
      this.peopleData = data;
      this.birthDateArr = [...new Set(this.peopleData.flatMap((x: any) => x?.birth_year))]
      // console.log(this.birthDateArr);
      this.filteredData = this.peopleData;
      this.loaderService.isLoading.next(false)
      // console.log(data);
    });
  }


  getMovieList() {
    this.swapiService.getMovieList().subscribe((data: any) => {
      // debugger
      this.movieData = data.results
      // console.log(this.movieData);
    });
  }
  getPlanetList() {
    this.swapiService.getAll('planets').subscribe((data: any) => {
      this.planetData = data
      // console.log(data);
    });
  }
  getSpeciesList() {
    this.swapiService.getAll('species').subscribe((data: any) => {
      this.speciesData = data
      // console.log(data);
    });
  }
  getVehicleList() {
    this.swapiService.getAll('vehicles').subscribe((data: any) => {
      this.vehicleData = data
      // console.log(data);
    });
  }
  getStarshipList() {
    this.swapiService.getAll('starships').subscribe((data: any) => {
      this.starshipData = data
      // console.log(data);
    });
  }



  filterPeopleData() {
    if (this.selectedMovie.length == 0 && this.selectedPlanet.length == 0 && this.selectedSpecies.length == 0 && this.selectedStarShip.length == 0 && this.selectedVehicle.length == 0 && this.selectedBirthDate.length == 0) {
      this.peopleData = this.filteredData
    }
    else {
      this.peopleData = this.filteredData.filter((ele: any) => {
        if (
          (this.selectedMovie.length == 0 || this.selectedMovie?.filter((movie: any) => ele?.films.indexOf(movie?.url) != -1)?.length > 0) &&
          (this.selectedPlanet.length == 0 || this.selectedPlanet?.filter((planet: any) => planet?.url == ele?.homeworld)?.length > 0) &&
          (this.selectedSpecies.length == 0 || this.selectedSpecies?.filter((species: any) => ele?.species.indexOf(species?.url) != -1)?.length > 0) &&
          (this.selectedStarShip.length == 0 || this.selectedStarShip?.filter((ship: any) => ele?.starships.indexOf(ship?.url) != -1)?.length > 0) &&
          (this.selectedVehicle.length == 0 || this.selectedVehicle?.filter((vehicle: any) => ele?.vehicles.indexOf(vehicle?.url) != -1)?.length > 0) &&
          (this.selectedBirthDate.length == 0 || this.selectedBirthDate?.filter((date: any) => ele?.birth_year == date)?.length > 0)
        ) {
          return ele;
        }
      })
    }

    // console.log(this.peopleData);

  }
  resetFilter() {
    this.selectedMovie = [];
    this.selectedPlanet = [];
    this.selectedSpecies = [];
    this.selectedStarShip = [];
    this.selectedVehicle = [];
    this.selectedBirthDate = [];
    this.peopleData = this.filteredData
  }
}

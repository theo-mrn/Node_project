import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.component.html',
  styleUrls: ['./top-rated-movies.component.css'],
})
export class TopRatedMoviesComponent implements OnInit {
  chart: Highcharts.Chart | undefined;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadTopRatedMovies();
  }

  loadTopRatedMovies(): void {
    this.movieService.getTopRatedMovies().subscribe({
      next: (movies) => {
        console.log('Movies data from backend:', movies); 
        const categories = movies.map((movie) => movie.series_title);
        const data = movies.map((movie) => movie.rating || 0); 
  
        this.renderChart(categories, data);
      },
      error: (err) => {
        console.error('Error fetching top-rated movies:', err);
      },
    });
  }

  renderChart(categories: string[], data: number[]): void {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Top Rated Movies',
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Movies',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Ratings',
        },
      },
      series: [
        {
          type: 'column',
          name: 'User Ratings',
          data: data,
        },
      ],
    };

    this.chart = Highcharts.chart('chart-container', chartOptions);
  }
}
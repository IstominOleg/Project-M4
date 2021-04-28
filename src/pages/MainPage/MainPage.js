import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

class MainPage extends Component {
    state = {
        searchLine: '',
        movies: [],
        favoritesMovies: [],
        title: '',
        inputActiv: true,
        inActiv: true,
    } 

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    addFavoritesMoviesList = (movie) => {
        let existingMovie = this.state.favoritesMovies.find((el) => {
            return movie.imdbID === el.imdbID
        })

        if (!existingMovie) {

            this.setState({ favoritesMovies: [...this.state.favoritesMovies, movie], inputActiv: false });
        }
    }
    submitFunc = () => {
        let name = this.state.searchLine.trim();;
        fetch(`http://www.omdbapi.com/?s=${name}&apikey=89fb182b`)
        .then(res => res.json())
        .then(data => {
            this.setState({movies: data.Search})
        })
    }
    titleListChange = (ev) => {
        this.setState({ title: ev.target.value });
    }
    deleteElementList = (imdbID) => {
        let newFavoritesMovies = this.state.favoritesMovies.filter(obj => {
            return obj.imdbID !==imdbID
        })
        this.setState({ favoritesMovies: newFavoritesMovies });
        
    }
    newTitleList = () => {
        this.setState({ inputActiv: true, inActiv: false });
        // https://acb-api.algoritmika.org/api/movies/list
        const info = {
            title: this.state.title,
            movies: [this.state.favoritesMovies],
        }
          fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
          })
          .then(res => res.json())
          .then(data => {
              console.log(data);
            //   this.setState({movies: data.Search})
          });
    }
    render() { 
        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox 
                                searchFunc={this.searchLineChangeHandler} 
                                searchLine={this.state.searchLine}
                                submitFunc={this.submitFunc}
                            />
                        </div>
                        <div className="main-page__movies">
                            <Movies 
                            arrMovies={this.state.movies}
                            addFunc={this.addFavoritesMoviesList}
                            />
                        </div>
                    </section>
                    <aside className="main-page__favorites">
                        <Favorites 
                        movies={this.state.favoritesMovies}
                        titleList={this.state.title}
                        titleListChange={this.titleListChange}
                        deleteItemList={this.deleteElementList}
                        newTitle={this.newTitleList}
                        inputActiv={this.state.inputActiv}
                        inActiv={this.state.inActiv}
                        />
                    </aside>
                </main>
            </div>
        );
    }
}
 
export default MainPage;
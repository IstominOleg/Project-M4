import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import './ListPage.css';




export default class ListPage extends Component {
    state = {
        movies: [],
        title: '',
    }
    fetchMovie = (imdbID) => {
        return fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=89fb182b`)
                .then(res => res.json())
    }
    fetchFuncList = (id) => {
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then(res => res.json())
        .then(data => {console.log(data);
            this.setState({title: data.title})
            let mov = data.movies.map((imdbID) => {
                return this.fetchMovie(imdbID)
            })
            return Promise.all(mov)
        }).then((arrMovies) => {
            console.log(arrMovies);
            this.setState( {movies: arrMovies} )
        })
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchFuncList(id)
        console.log(id);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
    }
    render() { 
        return (
            <div className="list-page">
                <Header />
                <main className="list-page__content">
                    <h1 className="list-page__title">{this.state.title}</h1>
                    <ul>
                        {this.state.movies.map((item) => {
                            return (
                                <li key={item.imdbID}>
                                    <a href={`https://www.imdb.com/title/${item.imdbID}`} target="_blank">{item.Title} ({item.Year})</a>
                                </li>
                            );
                        })}
                    </ul>
                </main>
            </div>
        );
    }
}
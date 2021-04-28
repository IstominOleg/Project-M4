import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
// import { connect } from "react-redux";
// import { fetchPosts } from '../../Redux/thunk';
import './Movies.css';

export default class Movies extends Component {
    // state = { 
    //     movies: [
            // {
            //     imdbID: 'tt3896198',
            //     title: "Guardians of the Galaxy Vol. 2",
            //     year: 2017,
            //     poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

            // },
            // {
            //     imdbID: 'tt0068646',
            //     title: "The Godfather",
            //     year: 1972,
            //     poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"

            // }
    //     ]
    // }
    // submitFunc = () => {
    //     const { searchLine } = this.props;
    //     console.log(searchLine);
    //     this.fetchMovies(searchLine)
    // }
    // fetchMovies = (name) => {
        
    //     fetch(`http://www.omdbapi.com/?s=${name}&apikey=89fb182b`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         this.setState({movies: data.Search})
    //     })
    // }

    // componentDidMount() {
    //     this.fetchMovies()
    //     // const id = this.props.match.params;
    //     // console.log(id);
    //     // this.props.fetchPostsWithThunk()
    //     // TODO: запрос к сервер на получение списка
    //     // TODO: запросы к серверу по всем imdbID
    // }

    render() {
        const { arrMovies, addFunc } = this.props;
        if (!arrMovies) {
            return <h1>Ничего не найдено!</h1>
        }
        return ( 
            <ul className="movies">
                {arrMovies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} addToTheList={() => addFunc(movie)}/>
                    </li>
                ))}
            </ul>
        );
    }
}
 
// const mapStateToProps = (state) => {
//     return { posts: state.posts }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchPostsWithThunk: () => dispatch(fetchPosts())
//     }
// }
 
// export default connect(mapStateToProps, mapDispatchToProps)(Movies);
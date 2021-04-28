import React, { Component } from 'react';
import './ListPage.css';




export default class ListPage extends Component {
    state = {
        movies: [
            // { title: 'The Godfather', year: 1972, imdbID: 'tt0068646' }
        ]
    }
    fetchFuncList = () => {
        // let name = this.state.searchLine.trim();;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/d7ddc381-e740-41ea-9d9d-db5a85e75a36`)
        .then(res => res.json())
        .then(data => {console.log(data);
            // this.setState({movies: data.Search})
        })
    }
    componentDidMount() {
        this.fetchFuncList()
        // const id = this.props.match.params;
        // console.log(id);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href="https://www.imdb.com/title/tt0068646/" target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
import React, { Component } from 'react';
import './Favorites.css';


class Favorites extends Component {
    state = {
        inActivButton: true,
        inActiv: true,
        title: '',
        id: null,
    }
    newTitleList = () => {
        this.setState({ inActiv: false, inActivButton: false });
        const info = {
            title: this.state.title,
            movies: this.props.movies.map((muvie) => {
                return muvie.imdbID
            }),
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
              this.setState({id: data.id})
          });
    }
    titleListChange = (ev) => {
        this.setState({ title: ev.target.value });
    }

    render() { 
        return (
            <div className="favorites">
                <input 
                value={this.state.title}
                disabled={this.props.movies.length === 0 || !this.state.inActivButton}
                className="favorites__name" 
                onChange={this.titleListChange}
                placeholder="Название списка"
                />
                <ul className="favorites__list">
                    {this.props.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>{item.Title} ({item.Year})&nbsp;&nbsp;
                            {this.state.inActivButton && <button  onClick={() => this.props.deleteItemList(item.imdbID)}>x</button>}
                            </li>
                        )
                    })}
                </ul>
                {this.state.inActivButton ? <button type="button" 
                disabled={this.state.title !== '' ? !this.state.inActiv : this.state.inActiv}
                className="favorites__save"
                onClick={this.newTitleList}
                >Сохранить список</button> : <a target='_blank' href={`/list/${this.state.id}`}>{this.state.title}</a>}
            </div>
        );
    }
}
 
export default Favorites;
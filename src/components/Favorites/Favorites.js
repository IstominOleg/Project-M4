import React, { Component } from 'react';
import './Favorites.css';


class Favorites extends Component {

    render() { 
        return (
            <div className="favorites">
                <input 
                value={this.props.titleList}
                disabled={this.props.inputActiv}
                className="favorites__name" 
                onChange={this.props.titleListChange}
                />
                <ul className="favorites__list">
                    {this.props.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>{item.Title} ({item.Year})&nbsp;&nbsp;
                            <button onClick={() => this.props.deleteItemList(item.imdbID)}>x</button>
                            </li>
                        )
                    })}
                </ul>
                {this.props.inActiv ? <button type="button" 
                className="favorites__save"
                onClick={this.props.newTitle}
                >Сохранить список</button> : <a href='/list/:id'>{this.props.titleList}</a>}
            </div>
        );
    }
}
 
export default Favorites;
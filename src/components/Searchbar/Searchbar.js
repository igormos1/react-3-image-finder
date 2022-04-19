import React, {Component} from "react";
import styles from './Searchbar.module.css';
import { ReactComponent as SearchBtn } from './search.svg';
import propTypes from 'prop-types';






class Searchbar extends Component {
   constructor() {
       super();
       this.state = {            
            searchQuery:''            
        }        
   } 
          

    handleSubmit = e => {         
        e.preventDefault();        
        const query = this.state.searchQuery.trim();
        if(query === '') {
            alert("Enter search word");
           
           
            return;
        }
       
        this.props.onSubmit(query);

        this.setState({
            searchQuery: ''            
        });
        
    }

   
    handleChange = e => {
        
        this.setState({
            searchQuery: e.currentTarget.value            
        })
    }

    render() {
        return(
            <header className={styles.searchbar}>
            <form 
                className={styles.form}
                onSubmit={this.handleSubmit}
                >
                <button type="submit" className={styles.button} >
                <span className={styles.buttonLabel} ><SearchBtn width="40" height="40"/></span>
                </button>

                <input                
                className={styles.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.searchQuery}
                onChange={this.handleChange}
                />
            </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,
    
  }

export default Searchbar;
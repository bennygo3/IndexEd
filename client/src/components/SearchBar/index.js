import React, { Component } from 'react';

import "./sideNav.css"

class SearchBar extends Component {
    componentDidMount() {
        // const opt = {
        //     edge: "right"
        // };
        // M.SearchBar.init(this.SearchBar, opt);
        
    }
    
    render() {
        // below has been modified
        // const options = []
        // for (var i = 0; i < this.props.categories.length; i +=1){
        //     options.push(<option value={this.props.categories[i]}>{this.props.categories[i]}</option>)
        // }
        const options = this.props.categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
        ));
        return (
            <div>
                <ul id="slide-out" className="sidenav no-autoinit">
                    <li>
                        <div className="row">
    
                            {/* <i className="col s2 material-icons" style="font-size:45px">search</i> */}
                            <div className="input-field col s10 ">
                                <input placeholder="Search" type="text" className="validate" />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div className="input-field col s12">
                                <select defaultValue="">
                                    <option value="" disabled>Categories</option>
                                    {options}
                                </select>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <button className="sideSearch btn waves-effect waves-light col s8 offset-s2" type="submit" name="action">Search
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </li>
                </ul>
                <button href="#" data-target="slide-out" className="sidenav-trigger right"><i className="side material-icons">search</i></button>
                <script src="./initalize.js"></script>
            </div>
        );
    }
    
}

export default SearchBar;
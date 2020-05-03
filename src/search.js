'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';

class Search extends React.Component{

    render(){
        return <div class="search-text">Search Text</div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)
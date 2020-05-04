'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import audio_ico from '../assets/images/audio_ico.png';
import browser from '../assets/images/browser.jpg';

class Search extends React.Component{

    render(){
        return <div class="search-text">
                 搜索页面12
                <img src={ browser } class="browser"/>
                <img src={ audio_ico } class="audio_ico"/>
            </div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)
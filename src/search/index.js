'use strict';

import '../../common/index';
import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import audio_ico from '../assets/images/audio_ico.png';
import browser from '../assets/images/browser.jpg';

class Search extends React.Component{

    render(){
        return <div className="search-text">
                 搜索页面
                <img src={ browser } className="browser"/>
                <img src={ audio_ico } className="audio_ico"/>
            </div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)
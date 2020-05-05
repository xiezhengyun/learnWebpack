'use strict';

import '../../common/index';
import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import audio_ico from '../assets/images/audio_ico.png';
import browser from '../assets/images/browser.jpg';

class Search extends React.Component{

    constructor(){
        super(...arguments);

        this.state = {
            Text:null
        }
    }

    loadComponent(){
        import('./text.js').then((Text)=>{
            this.setState({
                Text:Text.default
            })
        });
    }


    render(){
        const { Text } = this.state;
        return <div className="search-text">
                 搜索页面
                 { Text ? <Text /> : null}
                <img src={ browser } className="browser" onClick={ this.loadComponent.bind(this) }/>
                <img src={ audio_ico } className="audio_ico"/>
            </div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)
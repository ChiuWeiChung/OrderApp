import React from 'react';
import classes from './Item.module.css';
import Aux from '../../../hoc/auxiliary';
import Loader from '../../../components/Loader/Loader';

function Item(props) {
    const pathname = ['/omelette', '/toast', '/hamburger', '/dessert', '/drinks']
    const check = pathname.includes(props.pathname);
    const renderItems = check ? props.fetch.menuList.filter(el => el.type === props.pathname.replace('/', '')) : props.fetch.menuList;
    
    let spinner = props.imgStatus?null:<Loader/>
    let render = props.fetch.error ? <h1 style={{margin:'0 auto'}}>{props.fetch.error}</h1> : null;
    if (!props.fetch.err && props.fetch.menuList.length > 0) {
        render = renderItems.map(el => {
            return (
                <div className={classes.Item} key={el.id}>
                    <div className={classes.Item__Picture}>
                        {spinner}
                        <img src={el.url} alt={el.name} className={classes.Item__Pic} onLoad={props.handleImageLoaded} />
                    </div>
                    <div className={classes.Item__Info}>
                        <div className={classes.Item__Name}>{el.name} </div>
                        <div className={classes.Item__Price}>${el.price}NT </div>
                    </div>
                    <button className={classes.Item__Button} onClick={(e) => props.onChoose(el, e)} >下單</button>
                </div>
            )
        })
    }

    return (
        <Aux>
            <div className={classes.Items} onClick={() => props.exitDetail()}>
                <h2>{check?props.pathname.replace('/','').toUpperCase():null}</h2>
                <div className={classes.Items__flexbox} >
                    {render}
                </div>

            </div>
        </Aux>
    )
}

export default Item
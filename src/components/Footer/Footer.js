import classes from './Footer.module.css';


function footer() {
    return (
        <div className={classes.Footer}>
            <div className={classes.Footer__Description}>
                <p className={classes.Right}>&copy; Designed by by Rick Chiu.</p>
                <p>This app is only for portfolio demo, building with React, image source: Unsplash</p>
            </div>
        </div>
    )
}

export default footer
import classes from './Footer.module.css';


function footer() {
    return (
        <div className={classes.Footer}>
            <div className={classes.Description}>
                <h2 className={classes.Right}>&copy; Designed by <i className="fab fa-github"></i> <a href="https://github.com/ChiuWeiChung">Rick Chiu</a>, This Project Is Only For Demonstration</h2>
                <div className={classes.Utility}>
                    <p>Build up in React <i className="fab fa-react"></i> with Redux</p>
                    <p>Image Support: Unsplash <i className="fab fa-unsplash"></i></p>
                    <p>Icon Support: FontAwesome <i className="fab fa-font-awesome-flag"></i></p>
                </div>
            </div>
        </div>
    )
}

export default footer
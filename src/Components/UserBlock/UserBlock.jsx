import classes from "./UserBlock.module.css";


const UserBlock = () => {

    const handleClick = () => {};

    return (
        <div className={classes.userBlock}>
            <div className={classes.userAvatar} />
            <div onClick={handleClick} className={classes.userInform}>
                <p className={classes.username}>Username</p>
                <i />
            </div>
        </div>
    )
};

export default UserBlock;
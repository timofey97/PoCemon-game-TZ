import s from './style.module.css';

const Layout = ({id, title, urlBg ={}, colorBg = '', children}) => {
    return (
        <section 
        className={s.root} 
        id={id} 
        style={colorBg ? { backgroundColor: colorBg }: { backgroundImage: `url(${urlBg})` }} >
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        <h3>{title}</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={`${s.desc} ${s.full}`}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    )    
}

export default Layout;
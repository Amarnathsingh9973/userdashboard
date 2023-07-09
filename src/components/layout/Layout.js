import style from "./layout.module.css";

function Layout(props) {
  return (
    <div className="">
      <main className={style.main}>{props.children}</main>
    </div>
  );
} 

export default Layout;
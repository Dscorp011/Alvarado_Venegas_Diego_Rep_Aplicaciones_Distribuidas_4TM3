function Saludo(props) {
    return (
        <div>
            <h1>Buenos {props.tipo} {props.nombre}</h1>
        </div>
    );
}

export default Saludo;
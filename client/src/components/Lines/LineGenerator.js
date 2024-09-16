export default function LineGenerator({ amount, colorClass }) {
    const lines = [];
    for (let i = 0; i < amount; i++) {
        lines.push(<div key={i} className={colorClass}></div>);
    }
    return <div className="line-container">{lines}</div>;
};
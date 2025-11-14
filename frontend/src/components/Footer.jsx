export default function Footer() {
    return (
        <>
            <div style={{ height: "1rem", backgroundColor: "#f6f0e7" }}/>
            <div style={{
                backgroundColor: "#6d4c1b",
                color: "#FFFFFF",
                justifyItems: "center",
                paddingTop: "1rem",
                paddingBottom: "1rem"
                }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bolder"}}>DINER28 Team</h1>
                <ul style={{ justifyItems: "center" }}>
                    <li style={{ opacity: "0.5" }}>Click to see our GitHub accounts!</li>
                    <br/>
                    <li><a href="https://github.com/Lycos-Blanza" target="_blank">Lycos Blanza</a></li>
                    <li><a href="https://github.com/Zogratis2" target="_blank">Niño Casanova</a></li>
                    <li><a href="https://github.com/ollymt" target="_blank">Justin Guirre</a></li>
                    <li><a href="https://github.com/CheesyKeso" target="_blank">Francis Medrano</a></li>
                </ul>
            </div>
        </>
    )
}

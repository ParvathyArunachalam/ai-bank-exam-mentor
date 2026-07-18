import "./DashboardCard.css";

function DashboardCard({ title, description }) {

    return (

        <div className="card">

            <h2>{title}</h2>

            <p>{description}</p>

            <button>Open</button>

        </div>

    );
}

export default DashboardCard;
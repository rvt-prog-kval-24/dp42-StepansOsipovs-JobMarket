import React, {useEffect} from 'react';
import Badge from "react-bootstrap/Badge";
import CanvasJSReact from "@canvasjs/react-charts";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Statistic = () => {
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [countData, setCountData] = React.useState([]);
    const [vakances, setVakances] = React.useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        getAtsauksmes();
        getVakances();
    }, []);
    function getAtsauksmes() {
        axios.get(`http://localhost:8088/post/countByCompany`)
            .then(response => {
                const formattedData = response.data.map(item => ({
                    y: item.postCount,
                    label: item.company
                }));
                setCountData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    function getVakances() {
        axios.get(`http://localhost:8088/document/popular`)
            .then(response => {
                const formattedData = response.data.map(item => ({
                    y: item.apply_count,
                    label: item.header
                }));
                setVakances(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    const options = {
        backgroundColor: "#b5f9ee",
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        title:{
            text: "Top 5 kompānijas  "
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}",
            startAngle: -90,
            dataPoints: countData
        }]
    }
    const options2 = {
        backgroundColor: "#b5f9ee", // Цвет фона для второй диаграммы

        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        title:{
            text: "Populārakas vakances "
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}",
            startAngle: -90,
            dataPoints: vakances
        }]
    }
    return (
        <div>
            <header style={{borderRadius: '40px',height:'100vh'}}>
                {/*<div className={"colored"}>*/}
                <h1 className={"main-header"}>IT Market Statistika</h1>
                <div className="search-container">
                    <CanvasJSChart options = {options}
                        /* onRef={ref => this.chart = ref} */
                    />
                    {/*<br/>*/}
                    <CanvasJSChart  options = {options2}
                        /* onRef={ref => this.chart = ref} */
                    />
                </div>
            </header>
        </div>
);
};

export default Statistic;
import React, { useEffect, useState } from "react";
import Axios from "axios";

function Card(props) {
  const [pokeData, setPokeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    
      Axios.get(props.url).then((res) => {
        setPokeData(res.data);
        setIsLoading(false);
        setIsFetched(true);
      });
    
  },[props.url]);

  return (
    <React.Fragment>
      {isLoading === true ? (
        <div></div>
      ) : (
        <div className="col" >
          <div className="poke-card">
            <div className="poke-card-inner">
              <div className="frontal-card">
                <h4> {props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h4>
                <img src={pokeData.sprites.front_default} alt={props.name} />
              </div>
              <div className="back-card">
                {pokeData.types.map((el, index)=> <h4 className={'type '+el.type.name}  key={index} > {el.type.name}</h4> )}
                {pokeData.stats.map((poke,index)=>{return(
                  <p key={index}> {poke.stat.name} : <span style={{border: '1px solid black', backgroundColor: '#f05454', color:'white', margin:'5px'} }>{poke.base_stat}</span> </p>
                )})}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Card;

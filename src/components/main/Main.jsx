import React from 'react'
import './styles.css'
import Card from '../card/Card'
export const Main = () => {
    return (
        <div className="window">
            <div className="conteudo">
                <div className="navBar">

                </div>
                <div className="titulo">
                    <div className='cTitle'><span >Projeto 1</span></div>
                 </div>
                <div className="nav">aqui</div>
                <div className="containerMain">
                    <Card />
                </div>
            </div>
          </div>
    )
}

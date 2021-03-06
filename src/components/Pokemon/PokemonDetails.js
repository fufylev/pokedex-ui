import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../utils/API'
import CircularProgress from '../Loader/Loader'
import { COLORS } from '../../utils/COLORS'
import ProgressBar from '../ProgressBar/ProgressBar'
import Button from '@material-ui/core/Button'

function PokemonDetails () {
  const history = useHistory()
  const [pokemon, setPokemon] = useState()
  const [pokemonSpecies, setPokemonSpecies] = useState()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`${API_URL}pokemon/${id.split('-')[0]}`).then(response => setPokemon(response.data))
    axios.get(`${API_URL}pokemon-species/${id.split('-')[0]}`).then(response => setPokemonSpecies(response.data))
  }, [])

  const handleClose = () => {
    history.goBack()
  }

  return (
    <>
      {!pokemon ? <CircularProgress/> : (
        <div className='bigcard__container flex-v'>
          <div className='bigcard__title'>
            <h1 className=''>#{pokemon.id}&emsp;{pokemon.name.toUpperCase()}</h1>
          </div>
          <div className='bigcard__blocks flex-jcc'>
            <div className='pokemon__general'>
              <img src={pokemon.sprites.front_default} alt={`${pokemon.name}`} className='bigcard__avatar'/>
              <div className='flex-jcc'>
                {pokemon.types.map((type, idx) => (
                  <div
                    className='smallcard__pokemon-type'
                    style={{ background: COLORS[type.type.name] }}
                    key={idx}>
                    {type.type.name}
                  </div>
                ))}
              </div>
            </div>
            <div className='bigcard__desc'>
              <div className=''>
                <h3 className='bigcard__text'>
                  {pokemonSpecies && pokemonSpecies.flavor_text_entries.filter(flavor => flavor.language.name === 'en')[0].flavor_text}
                </h3>
              </div>
              <div className='flex-jcsb'>
                <div className='pokemon__table'>
                  <p><strong>Gender: </strong>{pokemon.sprites.back_female === null ? 'Male' : 'Female'}</p>
                  <p><strong>Weight: </strong>{pokemon.weight / 10} kg</p>
                  <p><strong>Height: </strong>{pokemon.height * 10} m</p>
                  {pokemonSpecies && <p><strong>Shape: </strong>{pokemonSpecies.shape.name}</p>}
                  {pokemon.abilities && <p><strong>Abilities: </strong>{pokemon.abilities.map(({ ability }, idx) => <span
                    key={idx}>{ability.name} &ensp;</span>)}</p>}
                </div>
                <div>
                  <div className='flex-v'>
                    {pokemon.stats.map((stat, idx) => (
                      <div key={idx} className='flex-jcsb pokemon-stats'>
                        <ProgressBar name={stat.stat.name} value={stat.base_stat}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button style={{ marginTop: '1rem' }} variant="contained" onClick={() => handleClose()}>Close</Button>
        </div>
      )}
    </>
  )
}

export default PokemonDetails

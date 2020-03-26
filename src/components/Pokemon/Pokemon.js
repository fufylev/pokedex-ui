import './Pokemon.scss'

import React from 'react'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
// import Typography from '@material-ui/core/Typography'
// import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar/ProgressBar'
import { COLORS } from '../../utils/COLORS'

// import { COLORS } from '../../utils/COLORS'

function Pokemon (props) {
  const { pokemon } = props

  return (
    <Link to={`/pokemons/${pokemon.id}-${pokemon.name}`} className='smallcard__link'>
      <div className='smallcard flex-v'>
        <div className='smallcard__header flex-jcc'>
          <h3>#{pokemon.id} &emsp; {pokemon.name.toUpperCase()}</h3>
        </div>
        <div className='smallcard__content flex-v'>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className='smallcard__avatar'/>
          <div className='smallcard__pokemon flex-jcc'>
            {pokemon.types.map((type, idx) => (
              <div
                className='smallcard__pokemon-type'
                style={{ background: COLORS[type.type.name] }}
                key={idx}>
                {type.type.name}
              </div>
            ))}
          </div>
          <div className='flex-v'>
            {pokemon.stats.map((stat, idx) => (
              <div key={idx} className='flex-jcsb pokemon-stats'>
                <ProgressBar name={stat.stat.name} value={stat.base_stat}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
    /* <Grid item xs={12} sm={6} md={4}>
      <Link to={`/pokemons/${pokemon.id}-${pokemon.name}`}>
        <Card className='pokemon-card'>
          <CardContent style={{ width: '100%', padding: '0!important' }}>
            <Typography className='flex-jcc' color="textSecondary">
              {pokemon.id} - {pokemon.name.toUpperCase()}
            </Typography>
            <div className='flex-jcc'>
              <img src={pokemon.sprites.front_default} alt=""/>
            </div>
            <div className='flex-jcc pokemon-types'>
              {pokemon.types.map((type, idx) => (
                <div
                  className='pokemon-type'
                  style={{ background: COLORS[type.type.name] }}
                  key={idx}>
                  {type.type.name}
                </div>
              ))}
            </div>
            <div className='flex-v'>
              {pokemon.stats.map((stat, idx) => (
                <div key={idx} className='flex-jcsb pokemon-stats'>
                  <div className='pokemon-stats-name'>{stat.stat.name}</div>
                  <meter value={stat.base_stat} min="0" max="100">{stat.stat.name}</meter>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </Grid> */
  )
}

Pokemon.propTypes = {
  pokemon: PropTypes.object
}

export default Pokemon

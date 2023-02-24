import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Place from '@mui/icons-material/Place';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '~/contexts/app';
import { stringAvatar } from '~/utils';

export default function Country() {
  const { id } = useParams() as { id: string };
  const { countries } = useContext(Context);
  const [country, setCountry] = useState<Exclude<typeof countries, null>[number]>();
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCountry(countries?.filter((country) => country.cca3 === id)?.[0]);
  }, [countries, id]);

  function goBack() {
    navigate(-1);
  }

  function openGeoLocation() {
    if (country) {
      window.open(country.maps.googleMaps, 'blank');
      // navigate(country.maps.googleMaps);
    }
  }

  function handleExpand() {
    setExpanded(!expanded);
  }

  const formatter = new Intl.NumberFormat('fi', { notation: 'standard' });

  return (
    <>
      {country ? (
        <div>
          <Card sx={{ maxWidth: 345, margin: '1rem auto' }}>
            <CardHeader
              avatar={<Avatar {...stringAvatar(country.name.common)} />}
              title={country.name.common.toUpperCase()}
              subheader={country.capital?.[0] || ''}
            />
            <CardMedia
              component='img'
              height='194'
              image={country.flags.svg}
              alt={country.flags.alt || country.name.official}
            />
            <CardContent>
              <Typography paragraph variant='body2' color='text.primary'>
                The country belogns to {country.region} region{' '}
                {country.subregion ? ' and ' + country.subregion + ' sub-region' : ''}. Located at
                the {country.latlng[0].toFixed(0)} °N and {country.latlng[1].toFixed(0)} °W, this
                country has population of {formatter.format(country.population)} and it has{' '}
                {country.independent ? '' : ' NOT '} gained the independence, according to the CIA
                World Factbook.
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton aria-label='Back' onClick={goBack}>
                <ChevronLeft />
              </IconButton>

              <IconButton aria-label='Open Geolocation' onClick={openGeoLocation}>
                <Place />
              </IconButton>

              <IconButton
                aria-label='Show more'
                style={{ marginLeft: 'auto' }}
                onClick={handleExpand}
              >
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography paragraph>Additional content</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      ) : (
        'Country was not found'
      )}
    </>
  );
}

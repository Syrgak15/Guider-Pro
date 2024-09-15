import React from 'react';
import styles from './Book.modules.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Book = ({title,author,date,price,image,tags,totalPrice,key}) => {
    return (
        <div className='book-page'>
            <div className="book-page__card">
                <Card sx={{width: 405}}>
                    <CardMedia
                        sx={{height: 140}}
                        image={image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            {author}
                        </Typography>
                        <Typography>
                            {date}
                        </Typography>
                        <Typography >
                            {price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {tags.map(tag => (
                            <button className='book-page__tags'>{tag}</button>
                        ))}
                    </CardActions>
                </Card>
            </div>
        </div>
    )
};

export default Book;
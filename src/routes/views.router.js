import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.render('home', { title: 'The ecommerce app' });
});

router.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts', { title: 'The products in real time' });
});

router.get('/addproducts', (req, res) => {
	res.render('addProducts', { title: 'Add new products' });
});

export default router;

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.render('home', { title: 'The ecommerce app' });
});

router.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts', { title: 'The products in real time' });
});

export default router;

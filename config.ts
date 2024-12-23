import 'dotenv/config';

const cookieSecret = process.env.COOKIE_SECRET || 'develop secret' 

export default {
  cookieSecret
} 
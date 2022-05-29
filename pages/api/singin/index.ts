import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import prisma from '../../../client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email: userEmail, password }: User = req.body;

  if (req.method === 'POST') {
    let existingUser;
    let hashedPassword: string;

    try {
      existingUser = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        msg: 'Could not create user, please try again',
      });
    }

    if (existingUser) {
      return res.status(422).json({
        success: false,
        msg: 'User exists already, please login instead.',
      });
    }

    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: 'Could not create user, please try again',
      });
    }

    try {
      // @ts-expect-error
      const userData = { email: userEmail, password: hashedPassword };
      const newUser = await prisma.user.create({ data: userData });
      let jwtToken;
      try {
        jwtToken = await new jose.SignJWT({ email: userEmail })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(new TextEncoder().encode(process.env.SECRET));
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: 'Signing up failed, please try again.',
        });
      }
      res.status(200).json({ user: newUser, token: jwtToken });
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong' });
    }
  }
}

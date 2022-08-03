import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../helpers/mongoDB';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import prisma from '../../../client';
import { IUserData } from '../../../@types/types';
import { setCookie } from 'nookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const {
    email: userEmail,
    password,
    expirationDate,
  }: { email: string; password: string; expirationDate?: string } = req.body;

  if (req.method === 'POST') {
    let existingUser;
    let hashedPassword: string;

    try {
      // existingUser = await prisma.user.findFirst({
      //   where: {
      //     email: userEmail,
      //   },
      // });
      existingUser = await User.findOne({ email: userEmail });
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
      const userData = {
        email: userEmail,
        // @ts-ignore
        password: hashedPassword,
        invoices: [],
      };
      //  const newUser = await prisma.user.create({ data: userData });
      const newUser = await User.create(userData);
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

      const tokenExpirationDate = new Date(
        new Date().getTime() + 1000 * 60 * 60
      );
      const userDataToSend: IUserData = {
        id: newUser.id,
        token: jwtToken,
        expiration: expirationDate || tokenExpirationDate.toISOString(),
        // @ts-ignore
        invoices: userData.invoices,
      };
      setCookie({ res }, 'userData', JSON.stringify(userDataToSend), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      res.status(200).json(userDataToSend);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong' });
    }
  }
}

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
  const {
    email: userEmail,
    password,
    expirationDate,
  }: { email: string; password: string; expirationDate?: string } = req.body;

  await dbConnect();
  if (req.method === 'POST') {
    let existingUser;
    try {
      // existingUser = await prisma.user.findFirst({
      //   where: {
      //     email: userEmail,
      //   },
      // });
      existingUser = await User.findOne({
        email: userEmail,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Logging in failed, please try again later.',
      });
    }
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        msg: 'Invalid credentials, could not log you in.',
      });
    }

    let isValidPassword;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Could not log you in,please check your credentials and try again',
      });
    }

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        msg: 'Invalid credentials, could not log you in.',
      });
    }

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
        msg: 'Logging in failed, please try again.',
      });
    }

    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);

    const userDataToSend: IUserData = {
      id: existingUser.id,
      token: jwtToken,
      expiration: expirationDate || tokenExpirationDate.toISOString(),
      // @ts-ignore
      invoices: [],
    };

    setCookie({ res }, 'userData', JSON.stringify(userDataToSend), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    res.status(201).json(userDataToSend);
  }
}

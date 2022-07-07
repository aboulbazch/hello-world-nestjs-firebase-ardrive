/**
 * 
 * 
 * Authentication Controller: it contains the API routes authentication related
 * 
 */

import { Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private jwtService: JwtService
        ) {}

    /* The Login Route */
}

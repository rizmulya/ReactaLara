<?php
// created by 'php artisan make:middleware Role'

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response //n $role
    {
        // <n>
        $roles = explode('|', $role);
        if (!in_array($request->user()->role, $roles)) {
            return redirect('/');
        }
        // </n>
        return $next($request);
    }
}
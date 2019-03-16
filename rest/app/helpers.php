<?php

use Illuminate\Http\Request;

if (! function_exists('request')) {
    /**
     * Get an instance of the current request or an input item from the request.
     *
     * @param  array|string  $key
     * @param  mixed   $default
     * @return \Illuminate\Http\Request|string|array
     */
    function request($key = null, $default = null)
    {
        $request = app()->make(Request::class);

        if (is_null($key)) {
            return $request;
        }

        if (is_array($key)) {
            return $request->only($key);
        }

        $value = $request->__get($key);

        return is_null($value) ? value($default) : $value;
    }
}

if (! function_exists('config_path')) {
    /**
     * Get the path to the configuration files.
     *
     * @return string
     */
    function config_path()
    {
        return app()->basePath().'/config';
    }
}

if (!function_exists('public_path'))
{
    /**
    * Return the path to public dir
    * @param null $path
    * @return string
    */
    function public_path($path=null)
    {
        return rtrim(app()->basePath('public/'.$path), '/');
    }
}

if ( ! function_exists('asset'))
{
    /**
     * Generate an asset path for the application.
     *
     * @param  string  $path
     * @param  bool    $secure
     * @return string
     */
    function asset($path, $secure = null)
    {
        return app('url')->asset($path, $secure);
    }
}

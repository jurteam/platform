<?php

use Hashids\Hashids;
use Illuminate\Http\Request;

if (!function_exists('request')) {
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

        if ($key === null) {
            return $request;
        }

        if (is_array($key)) {
            return $request->only($key);
        }

        $value = $request->__get($key);

        return $value === null ? value($default) : $value;
    }
}

if (!function_exists('config_path')) {
    /**
     * Get the path to the configuration files.
     *
     * @return string
     */
    function config_path()
    {
        return app()->basePath() . '/config';
    }
}

if (!function_exists('public_path')) {
    /**
     * Return the path to public dir
     * @param null $path
     * @return string
     */
    function public_path($path = null)
    {
        return rtrim(app()->basePath('public/' . $path), '/');
    }
}

if (!function_exists('asset')) {
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

if (!function_exists('encodeId')) {
    /**
     * Generate an asset path for the application.
     *
     * @param  integer  $id
     * @return string
     */
    function encodeId($id)
    {
        $hashids = new Hashids(env('HASHIDS_SALT'), env('HASHIDS_LENGTH'), env('HASHIDS_ALPHABET'));

        return $hashids->encode($id);
    }
}

if (!function_exists('decodeId')) {
    /**
     * Generate an asset path for the application.
     *
     * @param  string  $hashedId
     * @return integer
     */
    function decodeId($hashedId)
    {
        $hashids = new Hashids(env('HASHIDS_SALT'), env('HASHIDS_LENGTH'), env('HASHIDS_ALPHABET'));

        return $hashids->decode($hashedId)[0];
    }
}

if (!function_exists('array_to_object')) {
    /**
     * Convert PHP array to stdClass object
     *
     * @param  Array  $array
     * @return stdClass
     */
    function array_to_object($array)
    {
        $obj = new stdClass;
        foreach ($array as $k => $v) {
            if (strlen($k)) {
                if (is_array($v)) {
                    $obj->{$k} = array_to_object($v); //RECURSION
                } else {
                    $obj->{$k} = $v;
                }
            }
        }
        return $obj;
    }
}

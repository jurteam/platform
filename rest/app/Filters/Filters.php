<?php

namespace App\Filters;

use Illuminate\Http\Request;

abstract class Filters
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * @var Builder
     */
    protected $builder;

    /**
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Apply the filters
     *
     * @param Builder $builder
     *
     * @return Builder
     */
    public function apply($builder)
    {
        $this->builder = $builder;

        foreach ($this->filters as $filter) {
            if ($this->hasFilter($filter)) {
                $this->$filter($this->request->get($filter));
            }
        }

        return $this->builder;
    }

    /**
     * Check if the filter has been defined.
     *
     * @param String $filter
     *
     * @return Boolean
     */
    protected function hasFilter($filter)
    {
        return method_exists($this, $filter) && $this->request->has($filter) && ! empty($this->request->get($filter));
    }
}

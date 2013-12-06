angular.module('mkroli.controller', ['mkroli.repositories']).controller 'RepositoriesController', ($scope, repositories) ->
  merge = (id, doc) ->
    result = (id: id)
    result[k] = v for k, v of doc
    result

  searchIndex = lunr ->
    this.ref('id')
    this.field 'id', (boost: 3)
    this.field 'keywords', (boost: 2)
    this.field 'description'
  for id, repo of repositories
    searchIndex.add merge id, repo

  $scope.search = (query) ->
    if(query.length == 0)
      $scope.repositories =
        merge id, repo for id, repo of repositories
    else
      $scope.repositories =
        merge result.ref, repositories[result.ref] for result in searchIndex.search(query)
    $scope.inGroupsByCategory =
      for c, r of (repo for id, repo of $scope.repositories).groupBy('category')
        (category: c, repositories: r.inGroupsOf 2)
  $scope.search("")

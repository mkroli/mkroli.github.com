window.RepositoriesController = ($scope) ->
  markdownUrls =
    "Maven" : "http://maven.apache.org/"
    "Scrooge" : "https://github.com/twitter/scrooge"
    "Thrift" : "http://thrift.apache.org/"
    "Java" : "http://www.oracle.com/technetwork/java/index.html"
    "Scala" : "http://www.scala-lang.org/"
    "PAM" : "http://en.wikipedia.org/wiki/Pluggable_Authentication_Modules"
    "Brainfuck" : "http://en.wikipedia.org/wiki/Brainfuck"
    "Ook!" : "http://www.dangermouse.net/esoteric/ook.html"

  $scope.repositories = [(
      name: "number-series-solver"
      category: "Projects"
      description: "Number-series-solver can detect patterns in number series. It gives the found algorithm as well as the number which it thinks would come next."
      links: [
        (name: "Web Start", url: "http://content.wuala.com/contents/mkroli/public/number-series-solver/number-series-solver.jnlp")
        (name: "Repository", url: "https://github.com/mkroli/number-series-solver")
      ]
    ), (
      name: "scrooge-maven-plugin"
      category: "Projects"
      description: "A [Maven] Plugin around [Scrooge]. It will take [Thrift] idl-files and compile them using [Scrooge] to either [Java] or [Scala] source files."
      links: [
        (name: "Project Page", url: "http://mkroli.github.com/scrooge-maven-plugin/")
        (name: "Repository", url: "https://github.com/mkroli/scrooge-maven-plugin")
      ]
    ), (
      name: "Longest Prefix Match"
      category: "Projects"
      description: "Longest Prefix Match is an implementation of an associative array which doesn't associate keys to values using either the equals() or the hashCode(). Instead it compares the beginning of a String with the containing keys. The longest possible match will be associated and the value be returned."
      links: [
        (name: "Project Page", url: "http://mkroli.github.com/lpm/")
        (name: "Repository", url: "https://github.com/mkroli/lpm")
        (name: "Travis CI ![Build Status](https://api.travis-ci.org/mkroli/lpm.png?branch=master)", url: "http://travis-ci.org/mkroli/lpm")
      ]
    ), (
      name: "Brainfuck"
      category: "Projects"
      description: "[Brainfuck] and [Ook!] converter and interpreter."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/brainfuck")
      ]
    ), (
      name: "RotatingCounter"
      category: "Projects"
      description: "With RotatingCounter one can count events at the moment they occur. RotatingCounter can then calculate the sum of events over a given period. It will automatically expire too old events."
      links: [
        (name: "Project Page", url: "http://mkroli.github.com/RotatingCounter/")
        (name: "Repository", url: "https://github.com/mkroli/RotatingCounter")
      ]
    ), (
      name: "Phonetics"
      category: "Projects"
      description: "An implementation of [phonetic-algorithms](http://en.wikipedia.org/wiki/Phonetic_algorithm) (currently only the [Koelner Phonetics](http://de.wikipedia.org/wiki/K%C3%B6lner_Phonetik))."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/phonetics")
      ]
    ), (
      name: "innet"
      category: "Projects"
      description: "A small utility to check if host is in a specific net."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/innet")
      ]
    ), (
      name: "websum"
      category: "Projects"
      description: "websum calculates the [MD5 checksum](http://en.wikipedia.org/wiki/MD5) of the content behind urls."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/websum")
      ]
    ), (
      name: "waitfile"
      category: "Projects"
      description: "waitfile waits for files beeing deleted."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/waitfile")
      ]
    ), (
      name: "pam_groupmember"
      category: "Projects"
      description: "[PAM] module that checks groupmemberships."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/pam_groupmember")
      ]
    ), (
      name: "icmptx"
      category: "Patches"
      description: "ICMPTX provides a tunnel via ICMP protocol. This version changes the default behavior of aborting on \"sendto()\" failed to continuing."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/icmptx")
        (name: "Original homepage", url: "https://github.com/jakkarth/icmptx")
      ]
    ), (
      name: "pam_ldap"
      category: "Patches"
      description: "The pam_ldap module provides [LDAP](http://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) authentication and authorization for [PAM]. This version adds an additional configuration option to compare the login name with the ldap uid. This is to make the authentication process case sensitive."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/pam_ldap")
        (name: "Original homepage", url: "http://www.padl.com/OSS/pam_ldap.html")
      ]
    ), (
      name: "knockd_patch"
      category: "Patches"
      description: "This patch enables the knockd configuration to have multiple \"command\" and \"stop_command\" lines."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/knockd_patch")
        (name: "Original homepage", url: "http://www.zeroflux.org/projects/knock/")
      ]
    ), (
      name: "abook"
      category: "Patches"
      description: "Abook is an addressbook program. This version adds the ability to import vCards."
      links: [
        (name: "Repository", url: "https://github.com/mkroli/abook")
        (name: "Original homepage", url: "http://abook.sourceforge.net/")
      ]
  )]

  $scope.nameToId = (name) -> name.replace(/[ ]/g, "_").toLowerCase()

  $scope.inGroupsByCategory = for c, r of $scope.repositories.groupBy('category')
    (category: c, repositories: r.inGroupsOf 2)

  urlsMarkdown = ("[#{key}]: #{value}" for key, value of markdownUrls).join("\n")

  converter = new Showdown.converter
  $scope.markdown = (str) -> converter.makeHtml "#{str}\n#{urlsMarkdown}"

angular.bootstrap document, ['ngSanitize']

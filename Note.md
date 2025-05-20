# Some commands

## clean targets

```bash
mvn clean
```

## build sites: NoSuchFile...

```bash
mvn compile
```

## build sites:

```bash
mvn site
```

## build sites: wrong hrefs -> store it to staging-site
```bash
mvn site:stage-deploy -DstagingDirectory=target/staging-site
```
Recursively stage into specified area in `<distributionManagement>` in `pom.xml`



## quick run server:
```bash
mvn clean install -Dpmd.skip=true -DskipTests
cd docs-web
mvn -Pprod jetty:run
```
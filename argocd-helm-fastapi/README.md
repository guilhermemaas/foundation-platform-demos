Build:
```
docker build . -t gmaas2/foundation-platform-demos-argocd-helm-fastapi:latest
```

Run:
```
docker run -d -p 8585:8585 -e NAME=gmaas gmaas2/foundation-platform-demos-argocd-helm-fastapi:latest
```

Pull:
```
docker pull gmaas2/foundation-platform-demos-argocd-helm-fastapi:latest
```

Helm test:
```
helm install argocd-helm-fastapi helm-chart --namespace foundation-platform-demos --create-namespace --dry-run
```
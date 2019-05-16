# Checklist to setup CI/CD

Using the following tools:

* Gitlab
* Jenkins
* Cloud Foundry

### Credentials

* Git Access
* Cloud Foundry Access

### Step 1 Create Jenkins File

- Create `Jenkinsfile` in your root directory

```
pipeline {
  agent { docker { image 'node:latest' }}
  stages {
    stage('setup') {
      steps {
        sh 'npm -v'
      }
    }
  }
}
```


### Step 2 Create Project in Jenkins

- Click on New Item
- Enter Item Name
- Select Multibranch Pipeline
- Click Ok
- Setup git
- Save Project

### Step 3 Verify Jenkins Setup

- Verify Jenkins can checkout your project
- Verify Jenkins can scan your `Jenkinsfile`

### Step 4 Add stages to your Jenkinsfile

- Add environment variables

```
environment {
  HOME = '.'
  API = '...'
}
```

- Add Setup Phase

```
stage('setup') {
  steps {
    sh 'cd api && npm install'
    sh 'cd app && npm install'
  }
}
```

- Add Build Phase

```
stage('build') {
  when {
    changeset "**/app/*.*"
  }
  steps {
    sh "cd app && npm run build"
  }
}
```

- Add Test Phase

``` 
stage('test') {
  when {
    changeset "**/api/*.*"
  }
  steps {
    sh 'cd api && npm test'
  }
}
```

### Step 5 Add a webhook 

- Add webhook to CI in gitlab

> Open gitlab project, go to settings, select integrations
> 
> add url [jenkins server]/project/[project name]


- Validate hook triggers CI

Use the `Test` button to test the hook

### Step 6 Deploy to Cloud Foundry CD

- Add manifest.yml

```
---
env:
  DB: ...

applications:
  - name: api
    memory: 64M
    path: ./api
  - name: app
    memory: 64M
    path: ./app
```

- Add Deploy Phase

```
stage('deploy') {
  steps {
    sh 'rm -rf api/npm-cache'
    sh 'rm -rf app/.npm'
    pushToCloudFoundry(
      target: 'api.run.pivotal.io',
      organization: '....',
      cloudSpace: '...',
      credentialsId: '...'
    )
  }
}

```

- Validate deployment

### Finish

Congrats!




 





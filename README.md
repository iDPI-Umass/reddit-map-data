# reddit-map-data
Data for the Reddit Map Project

## Background

Reddit Map is a project of computer, data, and social scientists to explore and visualize Reddit. The website running the visualizations is available at https://redditmap.social. The data for the project is here. 

Reddit Map is a collaboration between the [Initiative for Digital Public Infrastructure](https://publicinfrastructure.org) (iDPI), [Media Cloud](https://www.mediacloud.org), and the UMass Amherst [Center for Data Science](https://ds.cs.umass.edu).

## Main Tasks

### Dependencies
Install dependencies with `npm install`.

### Publishing Changes to Data

After processing and preparing data, write it to the directory `/data`. We treat that directory as the authority. The published data will be available just as it appears there. However, we currently have an exception for the remote `/images` subdirectory. Please do not create an `/images` subdirectory because it will be ignored.

After you commit changes to our mainline branch, `main`, you'll want to cut a release and publish changes for the world to see. We've setup a GitHub action to make that easy for you. The publish task will sync storage in our infrastructure so that it looks exactly like what's in that directory. So any  

Merge the branch `main` into `publish`. The publish action will take care of the rest for you, syncing remote files, and dealing with HTTP caching. It will take several minutes for the sync and HTTP cache invalidation tasks to complete. 


## Other Tasks

There are Gulp tasks that allow you to perform other actions, but most people won't need to use them if they're working directly on the data layer.


### Deploying Infrastructure

You only need this if you're setting up an endpoint for the first time, or if the infrastructure configuration needs to be updated. Note that you'll need sufficient permissons in iDPI's AWS account.

```bash
AWS_PROFILE=idpi npx gulp deploy --environment=production-data
```


### Manually Syncing Data

You can run the publish action locally, if you have permissions with iDPI's AWS account. Use the following command:

```bash
AWS_PROFILE=idpi npx gulp publish --environment=production-data
```

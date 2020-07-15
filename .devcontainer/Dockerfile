#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
# https://github.com/microsoft/vscode-dev-containers/tree/v0.128.0/containers/javascript-node-12/.devcontainer/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-12

# ** [Optional] Uncomment this section to install additional packages. **
RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get -y install --no-install-recommends git-flow nano

USER node

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma/zinit/master/doc/install.sh)"
RUN sed -i -r 's/^plugins=\(.*?\)$/plugins=(git git-flow)/' ~/.zshrc
RUN echo "zinit light denysdovhan/spaceship-prompt" >> ~/.zshrc
RUN echo "zinit light zsh-users/zsh-autosuggestions" >> ~/.zshrc
RUN echo "zinit light zdharma/fast-syntax-highlighting" >> ~/.zshrc
RUN echo "zinit light zsh-users/zsh-completions" >> ~/.zshrc



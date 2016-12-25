# maslab-cli
愛知工業大学 伊藤暢浩研究室専用CLI

[![Build Status](https://travis-ci.org/k14041kk/maslab-cli.svg?branch=master)](https://travis-ci.org/k14041kk/maslab-cli)
[![Node](https://img.shields.io/badge/node-%3E%3D%206.9-brightgreen.svg)](https://nodejs.org/ja/)
[![Dependency Status](https://gemnasium.com/badges/github.com/k14041kk/maslab-cli.svg)](https://gemnasium.com/github.com/k14041kk/maslab-cli)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/k14041kk/maslab-cli/blob/master/License)


## 概要

伊藤暢浩研究室の各研究の開発環境の構築やサーバーにアクセスするため機能を提供します。

## 使い方

動作にnodejsを使用しています。nodejsがインストールされたパソコンで利用してください。

### インストール

####Windows

    $ install.bat
    
####Mac

    $ install.sh

### コマンド一覧

####基礎 Maslab-CLIのヘルプを表示

    $ maslab
    
####レスキューの開発環境を作成

    $ maslab rescue

####人狼知能の開発環境を作成

    $ maslab aiwolf
    
## 依存関係

~~gzipを解凍するために使っているtar.gzの最新版(1.0.5)にバグがあるので1.0.2を使用~~

=> 0.1.0で解凍処理を自作したので不要に

FROM golang:1.14-alpine AS build_base

WORKDIR /go/src/app
COPY app.go .

RUN go build -ldflags "-w" -o ./go-app .

# FROM alpine:latest
FROM hello-world

COPY --from=build_base /go/src/app/go-app /app/go-app

CMD ["/app/go-app"]


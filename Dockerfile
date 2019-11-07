FROM phusion/baseimage:0.11

COPY scripts/setup-01.sh /tmp/
RUN bash /tmp/setup-01.sh
COPY scripts/* /tmp/
RUN bash /tmp/setup-02.sh

CMD ["/sbin/my_init"]
